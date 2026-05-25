import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, TextField } from "@mui/material";
import { getUsers } from "./api";
import type { User } from "./type";

export default function App() {
  const [selected, setSelected] = useState<User | null>(null);

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center" }}>User Search</h1>

      {isError && (
        <p style={{ color: "red" }}>
          {(error as Error)?.message ?? "Failed to fetch users"}
        </p>
      )}

      <Autocomplete
        options={users}
        getOptionLabel={(user) => user.displayLabel}
        groupBy={(user) => user.displayLabel[0].toUpperCase()}
        loading={isLoading}
        onChange={(_, value) => setSelected(value)}
        renderInput={(params) => (
          <TextField {...params} label="Name" variant="outlined" />
        )}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        fullWidth
      />

      {selected && (
        <div style={{ marginTop: 24 }}>
          <h3>
            {selected.displayLabel}
            <br />

            {selected.address.street}
            <br />
            {selected.address.suite}
            <br />
            {selected.address.zipcode}
          </h3>
        </div>
      )}
    </div>
  );
}
