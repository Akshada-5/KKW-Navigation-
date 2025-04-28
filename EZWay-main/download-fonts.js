const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    name: 'Inter-Regular',
    url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
  },
  {
    name: 'Inter-Medium',
    url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2'
  },
  {
    name: 'Inter-SemiBold',
    url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2'
  },
  {
    name: 'Inter-Bold',
    url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2'
  }
];

const downloadFont = (font) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'assets', 'fonts', `${font.name}.ttf`);
    const file = fs.createWriteStream(filePath);
    
    https.get(font.url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${font.name}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
};

const downloadAllFonts = async () => {
  try {
    for (const font of fonts) {
      await downloadFont(font);
    }
    console.log('All fonts downloaded successfully!');
  } catch (error) {
    console.error('Error downloading fonts:', error);
  }
};

downloadAllFonts(); 