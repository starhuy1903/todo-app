import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import CenteredPage from "common/CenteredPage";
import { useAppContext } from "context/app";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "repositories/todo";

export default function SignInPage() {
  const { setToken } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const handleSignIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        setLoading(true);
        const result = await signIn({
          email: data.email,
          password: data.password,
        });
        setToken(result.data.accessToken);
        navigate("/");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setToken]
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );

  return (
    <CenteredPage>
      <Typography variant="h4">Todo App</Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          {...register("email", {
            validate: {
              required: (value) => value !== "" || "Email is required",
              maxLength: (value) =>
                value.length <= 20 || "Email must be less than 20 characters",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControl variant="outlined" error={!!errors.password}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            id="password-input"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...register("password", {
              validate: {
                required: (value) => value !== "" || "Password is required",
                minLength: (value) =>
                  value.length >= 6 || "Password must be at least 6 characters",
              },
            })}
          />
          <FormHelperText error={!!errors.password}>
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSubmit(handleSignIn)}
          disabled={loading}
        >
          Sign in
        </Button>
      </Box>
    </CenteredPage>
  );
}
