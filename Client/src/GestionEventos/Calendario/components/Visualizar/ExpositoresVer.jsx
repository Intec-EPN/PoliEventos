import { Box, Icon, Typography } from "@mui/material";
import { GiMicrophone } from "react-icons/gi";

export const ExpositoresVer = ({ expositores }) => {
  const color = "black";
  return (
    <Box mt={2}>
      <Typography
        variant="h3"
        sx={{ fontWeight: "normal", color: "#164dc9", fontSize: "1.2rem", fontWeight:"500",}}
      >
        {expositores.length > 1 ? "Expositores:" : "Expositor:"}
      </Typography>
      <Box display={"flex"} mt={1} gap={2}>
        {expositores.map((expositor, index) => {
          return (
            <Box display={"flex"} key={index} alignItems={"center"}>
              <Icon sx={{ fontSize: "1.7rem", pt: 0.5, color: color }}>
                <GiMicrophone />
              </Icon>
              {expositor.mail ? (
                <Typography
                  variant="body1"
                  sx={{ ml: 1, fontWeight:"500",fontSize: "1.1rem" }}
                >
                  <a
                    href={`mailto:${expositor.mail}`}
                    style={{ textDecoration: "none", color: color }}
                  >
                    {expositor.nombre}
                  </a>
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    ml: 1,
                    fontWeight:"500",
                    color: color,
                    fontSize: "1.1rem",
                  }}
                >
                  {expositor.nombre}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
