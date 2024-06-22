function EnrollmentStep5({ formData, subjects }) {
  return (
    <div className="p-6 bg-sky-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
      <p className="text-gray-700">
        You have successfully filled out the enrollment form. Please wait for faculty staff confirmation.
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Review Your Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Program: {formData.program}</li>
          <li>Major: {formData.major}</li>
          <li>Year Level: {formData.yearLevel}</li>
          <li>Section: {formData.section}</li>
          <li>Subjects: {subjects.join(" ")}</li>
        </ul>
      </div>
    </div>
  );
}

export default EnrollmentStep5;
