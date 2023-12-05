import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import CenteredPage from "common/CenteredPage";
import { useAppContext } from "context/app";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { signIn } from "repositories/todo";

export default function SignInPage () {
  const { setToken } = useAppContext();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<{
    username: string;
    password: string;
  }>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: 'all',
  });

  const handleSignIn = useCallback(async (data: { username: string, password: string }) => {
    try {
      const result = await signIn({ username: data.username, password: data.password });
      setToken(result.data.token);
      navigate('/');
    } catch (e) {
      console.log(e)
    }
  }, [navigate, setToken]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

  return (
    <CenteredPage>
      <TextField
        id="username-input"
        label="Username"
        variant="outlined"
        {...register('username', {
          validate: {
            required: (value) => value !== '' || 'Username is required',
            maxLength: (value) => value.length <= 20 || 'Username must be less than 20 characters',
          }
        })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <FormControl variant="outlined" error={!!errors.password}>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <OutlinedInput
          id="password-input"
          type={showPassword ? 'text' : 'password'}
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
          {...register('password', {
            validate: {
              required: (value) => value !== '' || 'Password is required',
              minLength: (value) => value.length >= 6 || 'Password must be at least 6 characters',
            }
          })}
        />
        <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSubmit(handleSignIn)}
      >
        Sign in
      </Button>
    </CenteredPage>
  )
}
