"use client";

import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Result = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams?.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (!session_id) return;

      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res?.json();
        debugger;
        if (res?.ok) {
            console.log("ASFasf " , sessionData);
          setSession(sessionData);
        } else {
          setError(sessionData?.error);
        }
      } catch (error) {
        setError("An error occured!");
      } finally {
        setLoading(false);
      }
    })();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="100%" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">loading....</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="100%" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100%" sx={{ textAlign: "center", mt: 4 }}>
      {session?.payment_status == "paid" ? (
        <>
          <Typography variant="h4">Thank you for the purchase!</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment Failed</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
};
export default Result;
