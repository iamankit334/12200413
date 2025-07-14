import { useState } from "react";
import UrlForm from "../components/UrlForm";
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

const db = {};

export default function ShortenerPage() {
  const [results, setResults] = useState([]);

  const handleShorten = (entries) => {
    const validEntries = entries.filter((e) => {
      if (db[e.shortcode]) return false; // uniqueness check
      db[e.shortcode] = e;
      return true;
    });
    setResults(validEntries);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <Card sx={{ mt: 2, boxShadow: 3 }}>
        <CardContent>
          <UrlForm onShorten={handleShorten} />
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Shortened URLs</Typography>
          <List>
            {results.map(({ shortcode, url, expiry }, idx) => (
              <ListItem key={idx} sx={{ display: 'block', mb: 1 }}>
                <strong>{shortcode}</strong>:{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> (Expires:{" "}
                {new Date(expiry).toLocaleString()})
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export { db };
