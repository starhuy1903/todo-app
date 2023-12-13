import { Box, TextField } from "@mui/material";
import { useCallback } from "react";
import { useTodoContext } from "../../../context/todo";

export default function FilterTask() {
  const { filter, onChangeFilter } = useTodoContext();

  const handleChangeFieldFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeFilter(e.target.value);
    },
    [onChangeFilter]
  );

  return (
    <Box mt={2}>
      <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        value={filter}
        onChange={handleChangeFieldFilter}
      />
    </Box>
  );
}
