import dayjs from "../../../../dayjsConfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, DialogContentText, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const hoy = dayjs().startOf("day");

export const FechaHora = ({ defaultStart, defaultEnd }) => {
  const { register, setValue } = useFormContext();
  const { start, end } = useSelector(
    (state) => state.gestionEvento.eventoCreacion
  );

  const [startDate, setStartDate] = useState(
    start ? dayjs(start).format("DD/MM/YYYY") : ""
  );
  const [startTime, setStartTime] = useState(
    start ? dayjs(start).format("HH:mm") : ""
  );
  const [endDate, setEndDate] = useState(
    end ? dayjs(end).format("DD/MM/YYYY") : ""
  );
  const [endTime, setEndTime] = useState(end ? dayjs(end).format("HH:mm") : "");

  useEffect(() => {
    if (defaultStart) {
      const formattedStartDate = dayjs(defaultStart).format("DD/MM/YYYY");
      const formattedStartTime = dayjs(defaultStart).format("HH:mm");
      setStartDate(formattedStartDate);
      setStartTime(formattedStartTime);
      setValue("startDate", formattedStartDate);
      setValue("startTime", formattedStartTime);
    }
    if (defaultEnd) {
      const formattedEndDate = dayjs(defaultEnd).format("DD/MM/YYYY");
      const formattedEndTime = dayjs(defaultEnd).format("HH:mm");
      setEndDate(formattedEndDate);
      setEndTime(formattedEndTime);
      setValue("endDate", formattedEndDate);
      setValue("endTime", formattedEndTime);
    }
  }, [defaultStart, defaultEnd, setValue]);

  useEffect(() => {
    if (!startDate && start) {
      const formattedStartDate = dayjs(start).format("DD/MM/YYYY");
      const formattedStartTime = dayjs(start).format("HH:mm");
      setStartDate(formattedStartDate);
      setStartTime(formattedStartTime);
      setValue("startDate", formattedStartDate);
      setValue("startTime", formattedStartTime);
    }
    if (!endDate && end) {
      const formattedEndDate = dayjs(end).format("DD/MM/YYYY");
      const formattedEndTime = dayjs(end).format("HH:mm");
      setEndDate(formattedEndDate);
      setEndTime(formattedEndTime);
      setValue("endDate", formattedEndDate);
      setValue("endTime", formattedEndTime);
    }
  }, [start, end, setValue, startDate, endDate]);

  useEffect(() => {
    if (startDate && !startTime) {
      setStartTime("00:00");
      setValue("startTime", "00:00");
    }
    if (endDate && !endTime) {
      setEndTime("00:00");
      setValue("endTime", "00:00");
    }
  }, [startDate, endDate, startTime, endTime, setValue]);

  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
    if (startTime) {
      setValue("startTime", startTime);
    }
    if (endDate) {
      setValue("endDate", endDate);
    }
    if (endTime) {
      setValue("endTime", endTime);
    }
  }, [startDate, startTime, endDate, endTime, setValue]);

  const formatTime = (time) => {
    return dayjs(time, "HH:mm").format("HH:mm");
  };

  return (
    <Box mb={1.5}>
      <DialogContentText sx={{ color: "#333333" }}>
        Ingrese las fechas y horas
      </DialogContentText>
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
              value={startDate ? dayjs(startDate, "DD/MM/YYYY") : null}
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              onChange={(date) => {
                const formattedDate = date ? date.format("DD/MM/YYYY") : "";
                setStartDate(formattedDate);
                setValue("startDate", formattedDate);
              }}
              slotProps={{
                textField: {
                  ...register("startDate"),
                },
              }}
            />
            <TimePicker
              value={startTime ? dayjs(startTime, "HH:mm") : null}
              onChange={(time) => {
                const formattedTime = time
                  ? formatTime(time.format("HH:mm"))
                  : "";
                setStartTime(formattedTime);
                setValue("startTime", formattedTime);
              }}
              ampm={false}
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
              minDate={startDate ? dayjs(startDate, "DD/MM/YYYY") : null}
              value={endDate ? dayjs(endDate, "DD/MM/YYYY") : null}
              views={["year", "month", "day"]}
              format="DD/MM/YYYY"
              onChange={(date) => {
                const formattedDate = date ? date.format("DD/MM/YYYY") : "";
                setEndDate(formattedDate);
                setValue("endDate", formattedDate);
              }}
              slotProps={{
                textField: {
                  ...register("endDate"),
                },
              }}
            />
            <TimePicker
              value={endTime ? dayjs(endTime, "HH:mm") : null}
              onChange={(time) => {
                const formattedTime = time
                  ? formatTime(time.format("HH:mm"))
                  : "";
                setEndTime(formattedTime);
                setValue("endTime", formattedTime);
              }}
              ampm={false}
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