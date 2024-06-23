import PropTypes from 'prop-types';

function EnrollmentStep5({ formData, sections }) {
  const sectionName = sections.find(section => section.section_id === formData.section)?.section_name || 'Unknown Section';
  return (
    <div className="p-6 bg-sky-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
      <p className="text-gray-700">
        Please review the details of your enrollment process before confirming. 
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Review Your Details</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Program: {formData.program}</li>
          <li>Major: {formData.major}</li>
          <li>Year Level: {formData.yearLevel}</li>
          <li>Section: {sectionName}</li>
          <li>Subjects: {formData.chosenSubs.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
}

EnrollmentStep5.propTypes = {
  formData: PropTypes.shape({
    program: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    yearLevel: PropTypes.string.isRequired,
    section: PropTypes.number.isRequired,
    chosenSubs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    section_id: PropTypes.number.isRequired,
    section_name: PropTypes.string.isRequired,
  })).isRequired,
};

export default EnrollmentStep5;
