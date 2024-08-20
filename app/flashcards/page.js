"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const FlashCards = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap?.data()?.flashCards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    })();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="100%">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards?.map((item, index) => {
          return (
            <Grid item xs={12} sx={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    handleCardClick(item);
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{item}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FlashCards;