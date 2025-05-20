import {
  Box, Container, Typography, Card, CardContent, CardActions, Button, Chip
} from "@mui/material";
import bg_img from "../assets/bg-img.png";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { loadStripe } from "@stripe/stripe-js";
import { createSubscriptionAPI } from "../utils/API";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

loadStripe("pk_test_51RLTeoGdZXshIjxRiGPAd0ygJF7s8zafVDuIZE6CHgcVccz1GrkxFFgkKw6DHfaSPCajjHfN5EC0SHNDoA64Wc7s005C5B9IoL");

const SubscriptionModel = () => {
  const plans = [
    {
      title: "1 Day Pass",
      plan: "premium",
      price: 99,
      gradient: "linear-gradient(135deg, #2c3e50, #4ca1af)",
    },
    {
      title: "Weekly Pass",
      plan: "premium",
      price: 599,
      label: "Most Popular",
      gradient: "linear-gradient(135deg, #1c1c1c, #434343)",
    },
    {
      title: "Monthly Pass",
      plan: "premium",
      price: 1999,
      label: null,
      gradient: "linear-gradient(135deg, #1f4037, #99f2c8)",
    }
  ];
  const handleSubscribe = async (plan: any) => {
    const token = localStorage.getItem("token");
    const isActive = localStorage.getItem('plan_type');
    if (!token)
      return;
    if(isActive === 'premium'){
      toast.error("Your Subscription is already active!");
      return;
    }
    const response = await createSubscriptionAPI(token, plan);
    const { url } = response;

    window.location.href = url;


  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundImage: `url(${bg_img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer
          position={window.innerWidth <= 600 ? 'top-center' : 'top-right'}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: '#1a1a3d',
            color: '#fff',
            border: '1px solid #6C63FF',
            borderRadius: '8px',
          }}
        />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 5,
          px: 4,
          py: 10,
          height: '70vh'
        }}
      >
        {plans.map((plan, index) => (
          <Card
            key={index}
            sx={{
              width: 340,
              borderRadius: "28px",
              padding: 3,
              backgroundImage: plan.gradient,
              color: "#fff",
              boxShadow: "0 20px 35px rgba(0,0,0,0.2)",
              position: "relative",
              transition: "transform 0.3s ease",
              '&:hover': {
                transform: "scale(1.04)",
                border: "3px solid #fff"
              },
              backdropFilter: "blur(12px)",
            }}
          >
            {plan.label && (
              <Chip
                label={plan.label}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#000",
                  fontWeight: "bold",
                }}
              />
            )}
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <StarIcon />
                <Typography variant="h5" fontWeight="bold">
                  {plan.title}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Rs.{plan.price}
              </Typography>
              <Box component="ul" sx={{ paddingLeft: 0, listStyle: "none", mt: 1 }}>
                {["Premium Movies", "Single Device"].map((feature, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                      fontSize: `30px`
                    }}
                  >
                    <CheckCircleIcon fontSize="medium" />
                    <Typography variant="body2" sx={{ fontSize: '15px', opacity: '0.6' }}>{feature}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleSubscribe(plan.plan)}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: 5,
                  px: 5,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                  '&:hover': {
                    backgroundColor: "#000",
                    color: "#fff",
                  }
                }}
              >
                Subscribe
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default SubscriptionModel;
