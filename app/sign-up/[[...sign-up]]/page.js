import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export function generateStaticParams() {
  return [
    { 'sign-up': [] }, // corresponds to /sign-in
  ];
}

const SignUpPage = () => {
    return (
      <Container maxWidth="100%" disableGutters>
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FlashCard SASS
            </Typography>
            <Button color="inherit">
              <Link href="/sign-in" passHref>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/sign-up" passHref>
                Sign Up
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Sign up</Typography>
          <SignUp />
        </Box>
      </Container>
    );
}

export default SignUpPage;