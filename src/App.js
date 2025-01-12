import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import garth from './garth.jpg';
import alan from './alan.jpg';
import Button from '@mui/material/Button';

const images = [
  {
    url: garth,
    title: 'Garth',
    width: '50%',
  },
  {
    url: alan,
    title: 'Alan',
    width: '50%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const getNextQuote = () => {
  let quotes = [
    { line : 'You know, as a writer, if you take away my paper, I would write on my heart.', name : 'Garth'},
    { line : 'As a horror writer I don\'t ask for much. I just hope I\'ve changed the way you think about life.', name : 'Garth'},
    { line : 'My books are all essentially about ‘what ifs’.', name : 'Garth'},
    { line : 'I\'ve always loved the great tragedies, King Lear, The Poseidon Adventure, Superman 2.', name : 'Garth'},
    { line : 'As a writer, I make my own rules up okay. If I wanna start a sentence with a full-stop I will.', name : 'Garth'},
    { line : 'The unanswered mystery is what stays with us the longest, and it’s what we’ll remember in the end.', name : 'Alan'},
    { line : 'Steven King once wrote that nightmares exist outside of logic and there’s little fun to be had in explanations. They’re antithetical to the poetry of fear.', name : 'Alan'},
    { line : 'In a horror story the victim keeps asking why, but there can be no explanation and there shouldn’t be one.', name : 'Alan'},
    { line : 'It\'s not a lake, it\'s an ocean.', name : 'Alan'},
    { line : 'The shriek sounded again. No way was it a human cry. No human vocal cord could produce such a bowel-shatteringly terrifying cacophony as that.', name : 'Garth'},
    { line : 'What... What\'re the Christmas lights for?', name : 'Alan'},
    { line : 'I’ve always had a vivid imagination, but this dream unsettled me. It was wild and dark and weird, even by my standards.', name : 'Alan'},
    { line : 'A story is not a machine that does what you tell it.', name : 'Alan'},
    { line : 'A story is a beast with a life of its own.', name : 'Alan'},
  ]

  let toReturn = quotes[Math.floor(Math.random() * (14 - 1) + 1)];
  return [ toReturn['line'], toReturn.name]
}


export default function ButtonBaseDemo() {
  const [quote, setQuote] = React.useState(getNextQuote())
  const [correctGuess, setCorrectGuess] = React.useState(getNextQuote())
  const [onNewRound, setOnNewRound] = React.useState(true)

  const isCorrectGuess = (name) => {
    return name === quote[1];
  } 

  const handleGuess = (guess) => {
    setOnNewRound(false)

    if (guess && guess.currentTarget && guess.currentTarget.value) {

      //display correct or not
      setCorrectGuess(isCorrectGuess(guess.currentTarget.value))
    }
  }

  const handleNextRound = () => {
      //get next quote 
      setQuote(getNextQuote())
      setOnNewRound(true)
  }

  return (
    <>
      <Box sx={{ padding: '2em'}} >
        <h1>{quote[0]}</h1>
      </Box>
    { !onNewRound && <Box sx={{ padding: '2em'}} >
      { correctGuess && <h1>Nice job! {quote[1]} said that one</h1>}
      { !correctGuess && <h1>Try again! {quote[1]} said that one</h1>}
      <Button variant="outlined" onClick={handleNextRound}>New Round!</Button>
      </Box>
    }
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          onClick={handleGuess}
          key={image.title}
          value={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={(theme) => ({
                position: 'relative',
                p: 4,
                pt: 2,
                pb: `calc(${theme.spacing(1)} + 6px)`,
              })}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </>
  );
}
