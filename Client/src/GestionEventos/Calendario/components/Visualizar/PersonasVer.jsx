import { Box, Icon, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const PersonasVer = ({ personas }) => {
  const color = "black";
  return (
    <Box mt={2}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "normal",
          color: "#164dc9",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        A cargo:
      </Typography>
      <Box display={"flex"} mt={1} gap={2}>
        {personas.map((personas, index) => {
          return (
            <Box display={"flex"} key={index} alignItems={"center"}>
              <Icon sx={{ fontSize: "1.7rem", pt: 0.5, color: color }}>
                <AccountCircleOutlinedIcon />
              </Icon>
              {personas.mail ? (
                <Typography
                  variant="body1"
                  sx={{ ml: 1, fontWeight: "450", fontSize: "1.1rem" }}
                >
                  <a
                    href={`mailto:${personas.mail}`}
                    style={{ textDecoration: "none", color: color }}
                  >
                    {personas.nombre}
                  </a>
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    ml: 1,
                    fontWeight: "450",
                    color: color,
                    fontSize: "1.1rem",
                  }}
                >
                  {personas.nombre}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
