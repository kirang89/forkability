var lintIssues = require('../lib/lintIssues');

describe('lintIssues', function () {
	it('should return warning of an uncommented issue', function () {
		var issues = [
			{
				user: {
					login: 'jimbob'
				},
				comments: 0,
				labels: ['a label'],
				title: 'This issue has no comments',
				html_url: 'This is a URL'
			}
		];

		var warnings = lintIssues(issues, 'joebloggs');

		warnings.should.containEql({
			message: 'Uncommented issue',
			details: {
				url: 'This is a URL',
				title: 'This issue has no comments'
			}
		});

		warnings.length.should.eql(1);
	});

	it('should return no warnings if all issues are commented upon', function () {
		var issues = [
			{
				user: {
					login: 'jimbob'
				},
				comments: 1,
				labels: [],
				title: 'This issue has no comments',
				html_url: 'This is a URL'
			}
		];

		var warnings = lintIssues(issues, 'joebloggs');

		warnings.length.should.eql(0);
	});

	it('should return no warnings if all untouched issues were opened by the repo author', function () {
		var issues = [
			{
				user: {
					login: 'joebloggs'
				},
				comments: 0,
				labels: [],
				title: 'This issue has no comments',
				html_url: 'This is a URL'
			}
		];

		var warnings = lintIssues(issues, 'joebloggs');

		warnings.length.should.eql(0);
	});

	it('should return warning of an untouched issue and uncommented issue', function () {
		var issues = [
			{
				user: {
					login: 'jimbob'
				},
				comments: 0,
				labels: [],
				title: 'This issue has no comments or labels',
				html_url: 'This is a URL'
			}
		];

		var warnings = lintIssues(issues, 'joebloggs');

		warnings.should.containEql({
			message: 'Uncommented issue',
			details: {
				url: 'This is a URL',
				title: 'This issue has no comments or labels'
			}
		});

		warnings.should.containEql({
			message: 'Untouched issue',
			details: {
				url: 'This is a URL',
				title: 'This issue has no comments or labels'
			}
		});

		warnings.length.should.eql(2);
	});
});