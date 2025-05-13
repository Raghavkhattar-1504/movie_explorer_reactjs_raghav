import { Box, Typography } from '@mui/material';

const gradients = [
  'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)',
  'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)'
];

interface GenreCardProps {
  data: string;
  onClick: (genre: string) => void;
}

const GenreCard = ({ data , onClick}: GenreCardProps) => {
  return (
    <Box
    onClick={() => {
      onClick?.(data);
    }
    }
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        width: '240px',
        height: '240px',
        margin: 2,
        backgroundImage: gradients[Math.floor(Math.random() * gradients.length)],
        boxShadow: '0px 0px 10px 5px rgba(59, 45, 107, 0.6)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '&:hover .genre-text': {
          fontSize: '35px',
        }
      }}
    >
      <Typography
        className="genre-text"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '30px',
          padding: 2,
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {data}
      </Typography>
    </Box>
  );
};

export default GenreCard;
