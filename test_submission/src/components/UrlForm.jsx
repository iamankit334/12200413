import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { logger } from "../utils/logger";
import { v4 as uuidv4 } from "uuid";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function UrlForm({ onShorten }) {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);

  const handleChange = (i, field, value) => {
    const copy = [...inputs];
    copy[i][field] = value;
    setInputs(copy);
  };

  const addInput = () => {
    if (inputs.length < 5)
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
  };

  const handleSubmit = () => {
    const results = [];

    inputs.forEach(({ url, validity, shortcode }, index) => {
      if (!url || !isValidUrl(url)) {
        logger(`Invalid URL at input ${index + 1}`, "error");
        return;
      }

      const minutes = validity ? parseInt(validity) : 30;
      if (isNaN(minutes)) {
        logger(`Invalid validity at input ${index + 1}`, "error");
        return;
      }

      const code = shortcode
        ? shortcode
        : uuidv4().slice(0, 6); // generate short unique code

      results.push({
        url,
        shortcode: code,
        expiry: new Date(Date.now() + minutes * 60000).toISOString(),
      });

      logger(`Shortened URL generated for input ${index + 1}`);
    });

    onShorten(results);
  };

  return (
    <div>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} marginBottom={2}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Long URL"
              value={input.url}
              onChange={(e) => handleChange(i, "url", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (mins)"
              value={input.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addInput} variant="outlined" sx={{ mr: 2 }}>
        Add URL
      </Button>
      <Button onClick={handleSubmit} variant="contained">
        Shorten
      </Button>
    </div>
  );
}
