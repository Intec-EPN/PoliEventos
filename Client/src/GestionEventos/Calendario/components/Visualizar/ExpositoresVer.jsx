import { Box, Icon, IconButton, Typography } from "@mui/material";
import { GiMicrophone } from "react-icons/gi";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

export const ExpositoresVer = ({ expositores }) => {
  const color = "black";
  return (
    <Box mt={2}>
      <Typography
        variant="h3"
        sx={{ color: "#164dc9", fontSize: "1.2rem", fontWeight: "500" }}
      >
        {expositores.length > 1 ? "Expositores:" : "Expositor:"}
      </Typography>
      <Box display={"flex"} mt={1} gap={2} flexWrap={"wrap"}>
        {expositores.map((expositor, index) => {
          return (
            <Box display={"flex"} key={index} alignItems={"center"}>
              <Icon sx={{ fontSize: "1.7rem", pt: 0.5, color: color }}>
                <GiMicrophone />
              </Icon>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontWeight: "500", fontSize: "1.1rem" }}
              >
                {expositor.nombre}
              </Typography>
              {expositor.mail && (
                <>
                  <IconButton
                    onClick={() =>
                      (window.location.href = `mailto:${expositor.mail}`)
                    }
                  >
                    <ForwardToInboxIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
