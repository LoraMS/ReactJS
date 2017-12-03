const validationFunc = (
  mail,
  confirmMail,
  username,
  password,
  confirmPassword
) => {
  const validMail = (() => {
    const mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const testMail = mailRegex.test(mail);
    if (testMail && mail === confirmMail && mail !== '') {
      return true;
    }
    return false;
  })();

  const validName = (() => {
    if (username !== '') {
      return true;
    }
    return false;
  })();

  const validPassword = (() => {
    if (
      password.length > 7 &&
      password !== '' &&
      password === confirmPassword
    ) {
      return true;
    }
    return false;
  })();

  return {
    validMail,
    validName,
    validPassword
  };
};

export default validationFunc;
