import { useTodoContext } from "../App";

export const FilterTask = () => {
  const { state, dispatch } = useTodoContext();

  const handleChangeFieldFilter = (e) => {
    dispatch({
      type: "SET_FILTER",
      payload: e.target.value,
    });
  };

  return (
    <div style={{ marginTop: 12 }}>
      <label style={{ marginRight: 6 }}>Filter</label>
      <input onChange={handleChangeFieldFilter} value={state.filter} />
    </div>
  );
};
