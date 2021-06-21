/* App config for apis
 BASE_URL "http://localhost:4000/" is Testing URL
 it can replace in development
 */
const APIConstants = {
  BASE_URL: 'http://covec.ddns.net:5000',
  GET_ADHAR_DETAILS: '/api/user/get_user_info_from_image',
  REGISTER_USER: '/api/user/covid_user_registration',
  SENT_OTP: '/api/user/generate_otp?phone_number=',
  VERIFY_OTP: '/api/user/verify_otp?user_otp=',
  GET_TEST_RESULT: '/api/user/covid_kit_test_result',
  GET_USER_DETAILS: '/api/user/get_user_profile',
  REGISTER_USER_FOR_TEST: '/api/user/covid_test_kit_user_registration',
  REGISTER_TEST_KIT: '/api/user/register_test_kit',
  TEST_HISTORY: '/api/user/covid_tests_history',
  COVID_TEST_GRAPG: '/api/analytics/covid_test_graph',
  UPLOAD_PROFILE_IMAGE: '/api/user/upload_profile_image',
  GET_SUBUSERS: '/api/user/get_subusers',
  ADD_SUB_USER: '/api/user/add_subuser',
  GET_ADHAR_BASED_RESULTS: '/api/user/get_result_by_uid'



};

export default APIConstants;
