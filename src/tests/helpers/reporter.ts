import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';

import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(_info: SuiteInfo, log: string): string {
    return `Resize It Testing Suites -- ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
);

// var _finishCallback = jasmine.Runner.prototype.finishCallback;
// jasmine.Runner.prototype.finishCallback = function () {
//     // Run the old finishCallback
//     _finishCallback.bind(this)();

//     // add your cleanup code here...
// };
