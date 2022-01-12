import http from "../http-common";

class WorkerDataService {
  getAllCarTreatments() {
    return http.get("/car-treatments/get-all");
  }
  deleteCarTreatmentByID(data) {
    return http.delete("/car-treatments/delete", { data: data });
  }
  updateCarTreatmentByID(data) {
    return http.post("/car-treatments/update", data);
  }
  addCarTreatment(data) {
    return http.put("/car-treatments/add", data);
  }
}

export default new WorkerDataService();
