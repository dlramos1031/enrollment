import { useEffect } from 'react';
import PropTypes from 'prop-types';

function EnrollmentStep3({ formData, setFormData, sections, sectionCount, currentStep, setEnableNext }) {
  useEffect(() => {
    setEnableNext(Boolean(formData.section));
  }, [currentStep, formData.section]);

  const handleSectionChange = (e) => {
    setFormData({ ...formData, section: Number(e.target.value) });
  };

  return (
    <div className="p-6 bg-sky-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Section</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Section</label>
        <select
          value={formData.section}
          onChange={handleSectionChange}
          className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.section_id} value={section.section_id}>
              {section.section_name} - {sectionCount}/5 students
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

EnrollmentStep3.propTypes = {
  formData: PropTypes.shape({
    section: PropTypes.number.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    section_id: PropTypes.number.isRequired,
    section_name: PropTypes.string.isRequired,
  })).isRequired,
  sectionCount: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  setEnableNext: PropTypes.func.isRequired,
};

export default EnrollmentStep3;
