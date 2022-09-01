import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-18-217-234-99.us-east-2.compute.amazonaws.com:8080/v1",
});
