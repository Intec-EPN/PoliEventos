import { Box, Icon, IconButton, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

export const PersonasVer = ({ personas }) => {
  const color = "black";
  return (
    <Box mt={2}>
      <Typography
        variant="h3"
        sx={{
          color: "#164dc9",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        A cargo:
      </Typography>
      <Box display={"flex"} mt={1} gap={2}>
        {personas.map((persona, index) => {
          return (
            <Box display={"flex"} key={index} alignItems={"center"}>
              <Icon sx={{ fontSize: "1.7rem", pt: 0.5, color: color }}>
                <AccountCircleOutlinedIcon />
              </Icon>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontWeight: "450", fontSize: "1.1rem" }}
              >
                {persona.nombre}
              </Typography>
              {persona.mail && (
                <IconButton onClick={() => window.location.href = `mailto:${persona.mail}`}>
                  <ForwardToInboxIcon sx={{ fontSize: "1.2rem" }} />
                </IconButton>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
