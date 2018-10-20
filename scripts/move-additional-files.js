'use-strict';

var gulp = require('gulp');
const config = require('../build.conf');

gulp.task('move-additional-files', function() {
  let licenseStream = gulp.src('LICENSE');
  getModulesRootFolders().forEach(
    moduleRoot => (licenseStream = licenseStream.pipe(gulp.dest(moduleRoot)))
  );
  return licenseStream;
});

function getModulesRootFolders() {
  const modules = ['extensions', 'screenfull'];
  return modules.map(module => `${config.distDir}/${module}`);
}
