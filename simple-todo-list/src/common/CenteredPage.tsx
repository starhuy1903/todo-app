import { Box } from "@mui/material";

export default function CenteredPage ({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ height: '100vh', margin: 'auto' }}>
      {children}
    </Box>
  )
}
