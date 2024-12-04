import dayjs from "../../../../dayjsConfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, DialogContentText, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const hoy = dayjs();

export const FechaHora = () => {
  const { register, setValue } = useFormContext();
  const { start, end } = useSelector(
    (state) => state.gestionEvento.eventoCreacion
  );

  const startDate = dayjs(start).startOf("day");
  const startTime = dayjs(start);
  const endDate = dayjs(end).startOf("day");
  const endTime = dayjs(end);

  return (
    <Box my={1} mb={1.5}>
      <DialogContentText>Ingrese las fechas y horas</DialogContentText>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          mt={0.7}
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Box display={"flex"} gap={1}>
            <DatePicker
              minDate={hoy}
              value={startDate}
              views={["year", "month", "day"]}
              onChange={(date) => setValue("startDate", date)}
              slotProps={{
                textField: {
                  ...register("startDate"),
                },
              }}
            />
            <TimePicker
              value={startTime}
              onChange={(time) => setValue("startTime", time)}
              slotProps={{
                textField: {
                  ...register("startTime"),
                },
              }}
            />
          </Box>
          <Typography variant={"body1"}>a</Typography>
          <Box display={"flex"} gap={1}>
            <DatePicker
              minDate={startDate}
              value={endDate}
              views={["year", "month", "day"]}
              onChange={(date) => setValue("endDate", date)}
              slotProps={{
                textField: {
                  ...register("endDate"),
                },
              }}
            />
            <TimePicker
              value={endTime}
              onChange={(time) => setValue("endTime", time)}
              slotProps={{
                textField: {
                  ...register("endTime"),
                },
              }}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};
