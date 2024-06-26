import PropTypes from 'prop-types';

function EnrollmentStep1({ formData }) {
  return (
    <div className="p-6 bg-sky-200 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Program and Major</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Program</label>
        <input
          type="text"
          value={formData.program}
          disabled
          className="mt-1 block w-full p-2 bg-sky-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Major</label>
        <input
          type="text"
          value={formData.major}
          disabled
          className="mt-1 block w-full p-2 bg-sky-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

EnrollmentStep1.propTypes = {
  formData: PropTypes.shape({
    program: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
  }).isRequired,
};

export default EnrollmentStep1;
