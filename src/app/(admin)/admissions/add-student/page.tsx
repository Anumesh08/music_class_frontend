// app/admission/page.tsx

"use client";

import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// ✅ ZOD SCHEMA for Admission Form
const schema = z.object({
  // Student Details
  student_name: z.string().min(1, "Student name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  whatsapp_number: z.string().min(10, "Valid WhatsApp number required"),
  address: z.string().min(1, "Address is required"),
  admission_type: z.enum(["new", "rejoined"], {
    message: "Please select admission type",
  }),
  rejoin_id: z.string().optional(),

  // Instrument & Course Details
  instrument: z.string().min(1, "Please select an instrument"),
  has_pre_knowledge: z.boolean(),
  days_per_week: z.string().min(1, "Please select days"),
  batch_timing: z.string().min(1, "Please select batch timing"),
  course_duration: z.string().min(1, "Please select course duration"),
  payment_mode: z.string().min(1, "Please select payment mode"),
  payment_installment: z.string().min(1, "Please select installment plan"),

  // Parent Details (for minors)
  father_name: z.string().optional(),
  father_occupation: z.string().optional(),
  father_whatsapp: z.string().optional(),
  mother_name: z.string().optional(),
  mother_occupation: z.string().optional(),
  mother_whatsapp: z.string().optional(),
});

type AdmissionFormType = z.infer<typeof schema>;

const AdmissionPage = () => {
  const queryClient = useQueryClient();
  const [isMinor, setIsMinor] = useState(true); // Assuming student is minor by default

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AdmissionFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      admission_type: "new",
      has_pre_knowledge: false,
      instrument: "Guitar",
      days_per_week: "Regular 2 days mon & wed",
      batch_timing: "Mon & wed 10.30am to 11.30am",
      course_duration: "Regular 2 days a week min duration for 6 months",
      payment_mode: "Online Transfer",
      payment_installment: "Full payment (Academic)",
    },
  });

  const admissionType = watch("admission_type");
  const selectedInstrument = watch("instrument");

  // Mock mutation - replace with actual API call
  const { mutate: submitAdmission, isPending } = useMutation({
    mutationFn: async (data: AdmissionFormType) => {
      // Replace with your actual API call
      console.log("Submitting admission data:", data);
      // const response = await fetch('/api/admission', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      // });
      return { success: true, data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      reset();
      alert("Admission form submitted successfully!");
    },
    onError: (error: any) => {
      console.error("Error submitting admission:", error);
      alert("Error submitting form. Please try again.");
    },
  });

  const onSubmit = (data: AdmissionFormType) => {
    // Save data temporarily
    localStorage.setItem("print_admission", JSON.stringify(data));

    // Call your mutation (optional)
    submitAdmission(data);

    // Open print page in new tab
    window.open("/admissions/print", "_blank");
  };

  return (
    <Box className="min-h-screen ">
      <Paper elevation={3} className="max-w-8xl mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Parent Details Section */}
          <Box className="mb-6">
            <Typography
              variant="h6"
              className="mb-3 font-weight text-gray-700"
              mb={2}
            >
              Parents details to be filled if the student is minor
            </Typography>

            <Grid container spacing={3} mt={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Name of Father"
                  {...register("father_name")}
                  error={!!errors.father_name}
                  helperText={errors.father_name?.message}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Father's occupation"
                  {...register("father_occupation")}
                  error={!!errors.father_occupation}
                  helperText={errors.father_occupation?.message}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Father's WhatsApp number"
                  {...register("father_whatsapp")}
                  error={!!errors.father_whatsapp}
                  helperText={errors.father_whatsapp?.message}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Name of mother"
                  {...register("mother_name")}
                  error={!!errors.mother_name}
                  helperText={errors.mother_name?.message}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Mother's occupation"
                  {...register("mother_occupation")}
                  error={!!errors.mother_occupation}
                  helperText={errors.mother_occupation?.message}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Mother's WhatsApp number"
                  {...register("mother_whatsapp")}
                  error={!!errors.mother_whatsapp}
                  helperText={errors.mother_whatsapp?.message}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider className="my-6" />

          {/* Student Details Section */}
          <Box className="mb-6">
            <Typography
              variant="h6"
              className="mb-3 font-semibold text-gray-700"
              mt={2}
              mb={2}
            >
              Please fill the details of Student
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="NAME OF STUDENT"
                  {...register("student_name")}
                  error={!!errors.student_name}
                  helperText={errors.student_name?.message}
                  size="small"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Date of birth"
                  type="date"
                  {...register("date_of_birth")}
                  error={!!errors.date_of_birth}
                  helperText={errors.date_of_birth?.message}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="WhatsApp number"
                  {...register("whatsapp_number")}
                  error={!!errors.whatsapp_number}
                  helperText={errors.whatsapp_number?.message}
                  size="small"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="ADDRESS"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  size="small"
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl error={!!errors.admission_type}>
                  <Typography variant="body2" className="mb-2">
                    I AM (select any one)
                  </Typography>
                  <Controller
                    name="admission_type"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="new"
                          control={<Radio />}
                          label="NEW ADMISSION"
                        />
                        <FormControlLabel
                          value="rejoined"
                          control={<Radio />}
                          label="RE-JOINED ADMISSION"
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.admission_type && (
                    <FormHelperText>
                      {errors.admission_type.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {admissionType === "rejoined" && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="IF YOU ARE RE-JOINED ADMISSION ENTER YOUR ID NUMBER"
                    {...register("rejoin_id")}
                    error={!!errors.rejoin_id}
                    helperText={errors.rejoin_id?.message}
                    size="small"
                  />
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider className="my-6" />

          {/* Instrument & Course Details */}
          <Box className="mb-6">
            <Typography
              variant="h6"
              className="mb-3 font-semibold text-gray-700"
              mt={2}
              mb={2}
            >
              Course Details
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.instrument}
                >
                  <InputLabel>INSTRUMENT TO LEARN</InputLabel>
                  <Controller
                    name="instrument"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="INSTRUMENT TO LEARN">
                        <MenuItem value="Guitar">Guitar</MenuItem>
                        <MenuItem value="Piano">Piano</MenuItem>
                        <MenuItem value="Drums">Drums</MenuItem>
                        <MenuItem value="Violin">Violin</MenuItem>
                        <MenuItem value="Flute">Flute</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.instrument && (
                    <FormHelperText>{errors.instrument.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl error={!!errors.has_pre_knowledge}>
                  <Typography variant="body2" className="mb-2">
                    DO YOU HAVE ANY PRE KNOWLEDGE IN PLAYING INSTRUMENT
                  </Typography>
                  <Controller
                    name="has_pre_knowledge"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        row
                        value={field.value ? "yes" : "no"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "yes")
                        }
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="YES"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="NO"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.days_per_week}
                >
                  <InputLabel>DAYS TO COME IN A WEEK</InputLabel>
                  <Controller
                    name="days_per_week"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="DAYS TO COME IN A WEEK">
                        <MenuItem value="Regular 2 days mon & wed">
                          Regular 2 days mon & wed
                        </MenuItem>
                        <MenuItem value="Regular 2 days tue & thu">
                          Regular 2 days tue & thu
                        </MenuItem>
                        <MenuItem value="Weekend only">Weekend only</MenuItem>
                        <MenuItem value="Weekdays only">Weekdays only</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.days_per_week && (
                    <FormHelperText>
                      {errors.days_per_week.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.batch_timing}
                >
                  <InputLabel>SELECT BATCH TIMING</InputLabel>
                  <Controller
                    name="batch_timing"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="SELECT BATCH TIMING">
                        <MenuItem value="Mon & wed 10.30am to 11.30am">
                          Mon & wed 10.30am to 11.30am
                        </MenuItem>
                        <MenuItem value="Mon & wed 4.30pm to 5.30pm">
                          Mon & wed 4.30pm to 5.30pm
                        </MenuItem>
                        <MenuItem value="Tue & thu 10.30am to 11.30am">
                          Tue & thu 10.30am to 11.30am
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {errors.batch_timing && (
                    <FormHelperText>
                      {errors.batch_timing.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.course_duration}
                >
                  <InputLabel>Select Course Below</InputLabel>
                  <Controller
                    name="course_duration"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Select Course Below">
                        <MenuItem value="Regular 2 days a week min duration for 6 months">
                          Regular 2 days a week min duration for 6 months
                        </MenuItem>
                        <MenuItem value="Regular 3 days a week min duration for 6 months">
                          Regular 3 days a week min duration for 6 months
                        </MenuItem>
                        <MenuItem value="Intensive 5 days a week for 3 months">
                          Intensive 5 days a week for 3 months
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {errors.course_duration && (
                    <FormHelperText>
                      {errors.course_duration.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.payment_mode}
                >
                  <InputLabel>PAYMENT MODE</InputLabel>
                  <Controller
                    name="payment_mode"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="PAYMENT MODE">
                        <MenuItem value="Online Transfer">
                          Online Transfer
                        </MenuItem>
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Card">Card</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.payment_mode && (
                    <FormHelperText>
                      {errors.payment_mode.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  variant="filled"
                  error={!!errors.payment_installment}
                >
                  <InputLabel>Academic fees installments</InputLabel>
                  <Controller
                    name="payment_installment"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Academic fees installments">
                        <MenuItem value="Full payment (Academic)">
                          Full payment (Academic)
                        </MenuItem>
                        <MenuItem value="2 install">2 install</MenuItem>
                        <MenuItem value="3 install">3 install</MenuItem>
                        <MenuItem value="4 install">4 install</MenuItem>
                        <MenuItem value="5 install">5 install</MenuItem>
                        <MenuItem value="6 install">6 install</MenuItem>
                        <MenuItem value="Month by month">
                          Month by month
                        </MenuItem>
                      </Select>
                    )}
                  />
                  {errors.payment_installment && (
                    <FormHelperText>
                      {errors.payment_installment.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Submit Button */}
          <Box className="mt-6 flex justify-end gap-3">
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={isPending}
              color="inherit"
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              className="bg-blue-600"
            >
              {isPending ? "Submitting..." : "Submit Admission"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AdmissionPage;
