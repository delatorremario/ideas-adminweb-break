export const developmentEnv = () => {
  process.env.MAIL_URL = 'smtp://desarrollo@holos.cl:.aslk3289@smtp.gmail.com:587';
};

export const productionEnv = () => {
  process.env.MAIL_URL = 'smtp://desarrollo@holos.cl:.aslk3289@smtp.gmail.com:587';
};
