import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  Box,
} from '@material-ui/core';
import '../../styles/Landing.scss';

export interface LandingProps {
  onContinue: (name: string) => void;
}
export const Landing: React.FC<LandingProps> = ({ onContinue }) => {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);

  const handleInput = () => {
    if (text.length <= 0 || text.includes(':')) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue(text);
  };
  return (
    <Card className="card">
      <TextField
        fullWidth
        error={showError}
        value={text}
        helperText={showError && 'Incorrect entry.'}
        onChange={(e) => setText(e.target.value)}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onKeyPress={(event) => {
          if (event.code === 'Enter') {
            handleInput();
          }
        }}
      />
      <Box marginTop={3}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleInput()}
        >
          Continue
        </Button>
      </Box>
    </Card>
  );
};
