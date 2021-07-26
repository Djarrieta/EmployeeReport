import { Box, Button, Card, TextField } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import '../../styles/Landing.scss';
import { SessionContext } from '../../../../context/SessionContext';

export interface LandingProps {
  onContinue: (name: string) => void;
}
export const Landing: React.FC<LandingProps> = ({ onContinue }) => {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);
  const {
    mutations: { setAlert },
  } = useContext(SessionContext);
  const handleInput = () => {
    if (text.length <= 0 || text.includes(':')) {
      if (setAlert) {
        setAlert('There is no Username.');
      }
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue(text);
    setAlert(`Hi ${text}! Welcome!`);
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
