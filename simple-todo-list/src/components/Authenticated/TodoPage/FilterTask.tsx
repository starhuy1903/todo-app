import { TextField } from "@mui/material";
import { useCallback } from "react";
import { useTodoContext } from "context/todo";

export default function FilterTask () {
  const { filter, onChangeFilter } = useTodoContext();

  const handleChangeFieldFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilter(e.target.value);
  }, [onChangeFilter]);

  return (
    <div style={{ marginTop: 16 }}>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={filter}
        onChange={handleChangeFieldFilter}
      />
    </div>
  );
};
