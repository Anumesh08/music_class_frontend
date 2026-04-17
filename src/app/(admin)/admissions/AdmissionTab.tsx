"use client";

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";

import { Search } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useRef, useState } from "react";

import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useRouter } from "next/navigation";
import AdmissionTableSkeleton from "@/components/skeleton/AdmissionTableSkeleton";

// Static product data
const staticProducts = [
  {
    product_id: 1,
    student_name: "John Doe",
    whatsapp_number: "9876543210",
    instrument: "Guitar",
    days_per_week: "3 days",
    batch_timing: "10:00 AM - 11:00 AM",
    payment_mode: "Monthly",
    payment_installment: "₹2000/month",
  },
  {
    product_id: 2,
    student_name: "Jane Smith",
    whatsapp_number: "9876543211",
    instrument: "Piano",
    days_per_week: "2 days",
    batch_timing: "11:00 AM - 12:00 PM",
    payment_mode: "Quarterly",
    payment_installment: "₹5000/quarter",
  },
  {
    product_id: 3,
    student_name: "Mike Johnson",
    whatsapp_number: "9876543212",
    instrument: "Drums",
    days_per_week: "4 days",
    batch_timing: "02:00 PM - 03:00 PM",
    payment_mode: "Half-Yearly",
    payment_installment: "₹10000/half-year",
  },
  {
    product_id: 4,
    student_name: "Sarah Williams",
    whatsapp_number: "9876543213",
    instrument: "Violin",
    days_per_week: "3 days",
    batch_timing: "03:00 PM - 04:00 PM",
    payment_mode: "Monthly",
    payment_installment: "₹2500/month",
  },
  {
    product_id: 5,
    student_name: "Robert Brown",
    whatsapp_number: "9876543214",
    instrument: "Flute",
    days_per_week: "2 days",
    batch_timing: "04:00 PM - 05:00 PM",
    payment_mode: "Yearly",
    payment_installment: "₹15000/year",
  },
];

const AdmissionTab = () => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(staticProducts);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const pageLimit = 20;

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.student_name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
      product.whatsapp_number.includes(debouncedSearch),
  );

  // Paginate products
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageLimit,
    page * pageLimit,
  );

  const totalPages = Math.ceil(filteredProducts.length / pageLimit);

  const handleDeleteOpen = (product_id: number) => {
    setSelectedProductId(product_id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => setDeleteOpen(false);

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      setIsDeleting(true);
      // Simulate delete
      setTimeout(() => {
        setProducts(products.filter((p) => p.product_id !== selectedProductId));
        setIsDeleting(false);
        handleDeleteClose();
      }, 500);
    }
  };

  return (
    <>
      <div className="bg-white rounded shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="w-full max-w-md">
              <TextField
                inputRef={searchInputRef}
                fullWidth
                size="small"
                placeholder="Search by student name, WhatsApp number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  "& input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </div>
            <Button
              variant="contained"
              onClick={() => router.push("/admissions/add-student")}
              style={{
                background: "linear-gradient(135deg, #E6C200 0%, #D4B000 100%)",
                boxShadow:
                  "inset 0 1px 3px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)",
                color: "black",
                fontWeight: "2px",
              }}
            >
              Add Student
            </Button>
          </div>
        </div>

        {/* Table */}
        <Box sx={{ maxHeight: "65vh", overflow: "auto" }}>
          {isLoading ? (
            <AdmissionTableSkeleton />
          ) : (
            <Table>
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  background: "#F7F9FC",
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell>Sr.No</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>WhatsApp Number</TableCell>
                  <TableCell>Instrument</TableCell>
                  <TableCell>Days per Week</TableCell>
                  <TableCell>Batch Timing</TableCell>
                  <TableCell>Payment Mode</TableCell>
                  <TableCell>Installment Plan</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts.map((p, index) => (
                    <TableRow key={p.product_id}>
                      <TableCell>
                        {(page - 1) * pageLimit + index + 1}
                      </TableCell>
                      <TableCell>{p.student_name || "N/A"}</TableCell>
                      <TableCell>{p.whatsapp_number || "N/A"}</TableCell>
                      <TableCell>{p.instrument || "N/A"}</TableCell>
                      <TableCell>{p.days_per_week || "N/A"}</TableCell>
                      <TableCell>{p.batch_timing || "N/A"}</TableCell>
                      <TableCell>{p.payment_mode || "N/A"}</TableCell>
                      <TableCell>{p.payment_installment || "N/A"}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <Tooltip title="View Details">
                            <i className="ri-eye-line text-green-500"></i>
                          </Tooltip>
                        </IconButton>

                        <IconButton size="small">
                          <Tooltip title="Print">
                            <i className="ri-printer-line text-blue-300"></i>
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteOpen(p.product_id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Box>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between">
          <div>
            Page {page} of {totalPages}
          </div>

          <div className="space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default AdmissionTab;
