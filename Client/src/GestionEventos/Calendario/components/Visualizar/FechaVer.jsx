import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "../../../../dayjsConfig";

export const FechaVer = ({ start, end }) => {
  const [moreDays, setMoreDays] = useState(true);

  useEffect(() => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    if (startDate.isSame(endDate, "day")) {
      setMoreDays(false);
    } else {
      setMoreDays(true);
    }
  }, [start, end]);

  const startDate = dayjs(start);
  const endDate = dayjs(end);

  return (
    <Box display={"flex"} sx={{ width: "auto" }} alignItems={"center"} flexWrap="nowrap">
      <Typography
        variant="h3"
        sx={{
          fontWeight:"500",
          color: "#164dc9",
          fontSize: "1.2rem",
          my: 0.5,
        }}
      >
        {moreDays ? "Fechas:" : "Fecha:"}
      </Typography>
      {moreDays ? (
        <Box display={"flex"} sx={{ width: "100%" }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", mr: 1, ml: 1, fontWeight: "450" }}
          >
            {startDate.format("DD/MM/YYYY")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", fontWeight: "450" }}
          >
            a
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", ml: 1, fontWeight: "450" }}
          >
            {endDate.format("DD/MM/YYYY")}
          </Typography>
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", ml: 1, fontWeight: "450" }}
        >
          {startDate.format("DD/MM/YYYY")}
        </Typography>
      )}
    </Box>
  );
};
