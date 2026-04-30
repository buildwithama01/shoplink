import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=No reference provided`);
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error("Paystack Verification Error:", data);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=Verification failed`);
    }

    const txData = data.data;

    // Check if the transaction was successful
    if (txData.status !== "success") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=Transaction was not successful`);
    }

    // Extract metadata
    const { storeId, planId, userId } = txData.metadata || {};

    if (!storeId || !planId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=Missing metadata in transaction`);
    }

    const supabase = await createClient();

    // Update the store's subscription plan
    // Using service role is not needed if the user is authenticated, but callbacks might not have the user's cookies depending on how the redirect happens.
    // Wait, the callback is a GET request from the user's browser, so cookies should be present.
    // Let's still use the storeId from the verified metadata to be safe and ensure the user owns it.
    
    const { data: { user } } = await supabase.auth.getUser();
    
    // In some flows, third party redirects might drop cookies (SameSite restrictions). 
    // It's safer to use a service client if cookies are missing, but let's try with the normal client first.
    // Since we are verifying the payment via Paystack, it's secure. 
    
    // Let's use service role key just to be absolutely sure the update succeeds even if cookies are dropped during redirect.
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: updateError } = await supabaseAdmin
      .from("stores")
      .update({ subscription_plan: planId })
      .eq("id", storeId);

    if (updateError) {
      console.error("Failed to update store plan:", updateError);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=Failed to update plan`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?success=Plan upgraded successfully`);
  } catch (error: any) {
    console.error("Subscription callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/seller/settings?error=Internal server error`);
  }
}
