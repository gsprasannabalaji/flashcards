'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: "POST",
      headers: {
        origin: "http://localhost:3000"
      }
    });

    const checkoutSessionJson = await checkoutSession?.json();

    if(checkoutSession?.statusCode == 500) {
      console.error(checkoutSession?.message);
      return;
    }

    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson?.id
    });

    if(error) {
      console.warn(error?.message);
    }
  }

  return (
    <Container maxWidth="100%" disableGutters>
      <Head>
        <title>Flashcard Sass</title>
        <meta name="description" content="Create a flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            FlashCard Sass
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>Welcome to FlashCard SASS</Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcard from the scratch
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => {
          router.push(`/generate`);
        }}>
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" marginBottom={2}>
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Simply input your text let our software do the rest. Creating
              Flashcards has never been easier
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart FlashCards</Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible anywhere</Typography>
            <Typography>
              Access your first card from any device, at any time. Study on the
              go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" marginBottom={2}>
          Pricing
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
          <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                Unlimited flashcard and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
