import http from "../http-common";

class WorkerDataService {
  getAllCarTreatments() {
    return http.get("/car-treatments/get-all");
  }
  deleteCarTreatmentByID(data) {
    return http.delete("/car-treatments/delete", data);
  }
  updateCarTreatmentByID(data) {
    return http.post("/car-treatments/update", data);
  }
}

export default new WorkerDataService();
