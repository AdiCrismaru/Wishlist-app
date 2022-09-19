import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function OutlinedButton({ click, text }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={click}>
        {text}
      </Button>
    </Stack>
  );
}
