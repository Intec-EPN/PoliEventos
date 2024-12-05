import dayjs from "../../../../dayjsConfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, DialogContentText, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const hoy = dayjs();

export const FechaHora = ({ defaultStart, defaultEnd }) => {
  const { register, setValue } = useFormContext();
  const { start, end } = useSelector(
    (state) => state.gestionEvento.eventoCreacion
  );

  const startDate = dayjs(start).format("DD/MM/YYYY");
  const startTime = dayjs(start).format("HH:mm");
  const endDate = dayjs(end).format("DD/MM/YYYY");
  const endTime = dayjs(end).format("HH:mm");

  useEffect(() => {
    if (defaultStart) {
      setValue("startDate", dayjs(defaultStart).format("DD/MM/YYYY"));
      setValue("startTime", dayjs(defaultStart).format("HH:mm"));
    }
    if (defaultEnd) {
      setValue("endDate", dayjs(defaultEnd).format("DD/MM/YYYY"));
      setValue("endTime", dayjs(defaultEnd).format("HH:mm"));
    }
  }, [defaultStart, defaultEnd, setValue]);

  return (
    <Box mb={1.5}>
      <DialogContentText sx={{ color:"#333333" }}>Ingrese las fechas y horas</DialogContentText>
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
              value={start ? dayjs(start, "YYYY-MM-DDTHH:mm:ssZ") : null}
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              onChange={(date) => setValue("startDate", date.format("DD/MM/YYYY"))}
              slotProps={{
                textField: {
                  ...register("startDate"),
                },
              }}
            />
            <TimePicker
              value={start ? dayjs(start, "YYYY-MM-DDTHH:mm:ssZ") : null}
              onChange={(time) => setValue("startTime", time.format("HH:mm"))}
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
              minDate={start ? dayjs(start, "YYYY-MM-DDTHH:mm:ssZ") : null}
              value={end ? dayjs(end, "YYYY-MM-DDTHH:mm:ssZ") : null}
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              onChange={(date) => setValue("endDate", date.format("DD/MM/YYYY"))}
              slotProps={{
                textField: {
                  ...register("endDate"),
                },
              }}
            />
            <TimePicker
              value={end ? dayjs(end, "YYYY-MM-DDTHH:mm:ssZ") : null}
              onChange={(time) => setValue("endTime", time.format("HH:mm"))}
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
