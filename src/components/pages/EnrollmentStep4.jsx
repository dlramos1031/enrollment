import PropTypes from 'prop-types';

function EnrollmentStep4({ formData, setFormData, subjects }) {
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, chosenSubs: [...formData.chosenSubs, value] });
    } else {
      setFormData({ ...formData, chosenSubs: formData.chosenSubs.filter((subject) => subject !== value) });
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
              value={subject.subject_code}
              onChange={handleSubjectChange}
              checked={formData.chosenSubs.includes(subject.subject_code)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              {subject.subject_code} - {subject.title} ({subject.units} units)
              <br />
              <span className="text-xs text-gray-500">
                {subject.schedule}, {subject.first_name} {subject.last_name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

EnrollmentStep4.propTypes = {
  formData: PropTypes.shape({
    chosenSubs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape({
    subject_id: PropTypes.number.isRequired,
    subject_code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    units: PropTypes.number.isRequired,
    schedule: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  })),
};

export default EnrollmentStep4;
