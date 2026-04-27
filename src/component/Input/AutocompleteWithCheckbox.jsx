import React from "react";
import {
  Autocomplete,
  Checkbox,
  TextField,
  FormControl,
  Chip,
  styled,
  Box,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Icons
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Styled Components
const StyledFormControl = styled(FormControl)(() => ({
  width: "100%",
  maxWidth: 600,
}));

const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    paddingLeft: 8,
    fontSize: 16,
    border: "1px solid #333",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#888",
  },
  "& .MuiChip-root": {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 12,
    fontWeight: 500,
  },
  "& .MuiChip-deleteIcon": {
    color: "#aaa",
  },
  "& .MuiAutocomplete-endAdornment": {
    top: "calc(50% - 14px)",
  },
}));

const StyledListBox = styled("ul")(() => ({
  backgroundColor: "#121212",
  color: "#eee",
  //   borderRadius: 12,
  marginTop: 4,
  padding: 8,
  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
  maxHeight: 300,
  overflowY: "auto",
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  color: "#666",
  "&.Mui-checked": {
    color: "#0b0437",
  },
}));

const StyledOption = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 14px",
  //   borderRadius: 10,
  transition: "background 0.2s ease",
  "&:hover": {
    backgroundColor: "#232323",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputLabel-root": {
    color: "#aaa",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
}));

const AutocompleteWithCheckbox = ({
  options,
  value,
  onChange,
  fullWidth,
  label = "Select Options",
}) => {
  return (
    <StyledFormControl>
      <StyledAutocomplete
        multiple
        disableCloseOnSelect
        options={options}
        value={value}
        fullWidth={fullWidth}
        onChange={(e, newVal) => onChange(newVal)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(o, v) => o.value === v.value}
        ListboxComponent={({ children, ...rest }) => (
          <StyledListBox {...rest}>{children}</StyledListBox>
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            <StyledOption>
              <StyledCheckbox
                checked={selected}
                icon={icon}
                checkedIcon={checkedIcon}
              />
              <Typography>{option.label}</Typography>
            </StyledOption>
          </li>
        )}
        renderInput={(params) => (
          <StyledTextField {...params} label={label} variant="outlined" />
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              key={option.value}
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
      />
    </StyledFormControl>
  );
};

export default AutocompleteWithCheckbox;
