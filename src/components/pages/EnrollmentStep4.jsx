function EnrollmentStep4({ formData, setFormData, subjects }) {

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, subjects: [...formData.subjects, value] });
    } else {
      setFormData({ ...formData, subjects: formData.subjects.filter((subject) => subject !== value) });
    }
  };

  return (
    <div className="p-6 bg-sky-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subject Selection</h2>
      <div>
        {subjects.map((subject) => (
          <div key={subject.subject_id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={subject.code}
              onChange={handleSubjectChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              {subject.subject_code} - {subject.title} ({subject.units} units)
              <br />
              <span className="text-xs text-gray-500">
                {subject.schedule}, {subject.first_name + " " + subject.last_name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrollmentStep4;
