'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../../../routes');

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _campaign = require('../../../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _RequestRow = require('../../../components/RequestRow');

var _RequestRow2 = _interopRequireDefault(_RequestRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/Rothacker/Desktop/ikigaidojo/Solidity/kickstart/pages/campaigns/requests/index.js?entry';


var RequestIndex = function (_Component) {
  (0, _inherits3.default)(RequestIndex, _Component);

  function RequestIndex() {
    (0, _classCallCheck3.default)(this, RequestIndex);

    return (0, _possibleConstructorReturn3.default)(this, (RequestIndex.__proto__ || (0, _getPrototypeOf2.default)(RequestIndex)).apply(this, arguments));
  }

  (0, _createClass3.default)(RequestIndex, [{
    key: 'renderRequests',
    value: function renderRequests() {
      var Header = _semanticUiReact.Table.Header,
          Row = _semanticUiReact.Table.Row,
          HeaderCell = _semanticUiReact.Table.HeaderCell,
          Body = _semanticUiReact.Table.Body;

      return _react2.default.createElement(_semanticUiReact.Table, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement(Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, _react2.default.createElement(Row, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, 'ID'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, 'Description'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, 'Amount'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, 'Recipient'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, 'Aproval Count'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, 'Approve'), _react2.default.createElement(HeaderCell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, 'Finalize'))), _react2.default.createElement(Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, this.renderRows()));
    }
  }, {
    key: 'renderRows',
    value: function renderRows() {
      var _this2 = this;

      return this.props.requests.map(function (request, index) {
        return _react2.default.createElement(_RequestRow2.default, {
          key: index,
          id: index,
          request: request,
          address: _this2.props.address,
          contributorCount: _this2.props.contributorCount,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, ' Requests '), _react2.default.createElement(_routes.Link, { route: '/campaigns/' + this.props.address + '/requests/new', __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { floated: 'right', style: { marginBottom: 10 }, primary: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, 'Add request'))), this.renderRequests(), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, 'Found ', this.props.requestCount, ' requests'));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var address, campaign, requestCount, contributorCount, requests;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                address = props.query.address; //destructuring from props.query

                campaign = (0, _campaign2.default)(address);
                _context.next = 4;
                return campaign.methods.getRequestCount().call();

              case 4:
                requestCount = _context.sent;
                _context.next = 7;
                return campaign.methods.contributorCount().call();

              case 7:
                contributorCount = _context.sent;
                _context.next = 10;
                return _promise2.default.all(Array(requestCount).fill().map(function (element, index) {
                  return campaign.methods.requests(index).call();
                }));

              case 10:
                requests = _context.sent;
                return _context.abrupt('return', { address: address, requests: requests, requestCount: requestCount, contributorCount: contributorCount });

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RequestIndex;
}(_react.Component);

exports.default = RequestIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2NhbXBhaWducy9yZXF1ZXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWFjdCIsIkNvbXBvbmVudCIsIkdyaWQiLCJCdXR0b24iLCJUYWJsZSIsIkxpbmsiLCJMYXlvdXQiLCJnZXRDYW1wYWlnbiIsIlJlcXVlc3RSb3ciLCJSZXF1ZXN0SW5kZXgiLCJIZWFkZXIiLCJSb3ciLCJIZWFkZXJDZWxsIiwiQm9keSIsInJlbmRlclJvd3MiLCJwcm9wcyIsInJlcXVlc3RzIiwibWFwIiwicmVxdWVzdCIsImluZGV4IiwiYWRkcmVzcyIsImNvbnRyaWJ1dG9yQ291bnQiLCJtYXJnaW5Cb3R0b20iLCJyZW5kZXJSZXF1ZXN0cyIsInJlcXVlc3RDb3VudCIsInF1ZXJ5IiwiY2FtcGFpZ24iLCJtZXRob2RzIiwiZ2V0UmVxdWVzdENvdW50IiwiY2FsbCIsImFsbCIsIkFycmF5IiwiZmlsbCIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFROztBQUN2QixBQUFTLEFBQVk7O0FBQ3JCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWlCOzs7O0FBQ3hCLEFBQU8sQUFBZ0I7Ozs7Ozs7OztJQUVqQixBOzs7Ozs7Ozs7OztxQ0FrQmE7VUFBQSxBQUNQLFNBRE8sQUFDMkIsdUJBRDNCLEFBQ1A7VUFETyxBQUNDLE1BREQsQUFDMkIsdUJBRDNCLEFBQ0M7VUFERCxBQUNNLGFBRE4sQUFDMkIsdUJBRDNCLEFBQ007VUFETixBQUNrQixPQURsQixBQUMyQix1QkFEM0IsQUFDa0IsQUFDakM7OzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0csY0FBRDs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0csY0FBRDs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0csY0FBRDs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBREYsQUFDRSxBQUNBLHVCQUFDLGNBQUQ7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUZGLEFBRUUsQUFDQSxnQ0FBQyxjQUFEOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FIRixBQUdFLEFBQ0EsMkJBQUMsY0FBRDs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBSkYsQUFJRSxBQUNBLDhCQUFDLGNBQUQ7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUxGLEFBS0UsQUFDQSxrQ0FBQyxjQUFEOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FORixBQU1FLEFBQ0EsNEJBQUMsY0FBRDs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBVE4sQUFDRSxBQUNFLEFBT0UsQUFHSiwrQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxjQWJKLEFBQ0UsQUFZRSxBQUFPLEFBQUssQUFHakI7Ozs7aUNBRVk7bUJBQ1g7O2tCQUFPLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsSUFBSSxVQUFBLEFBQUMsU0FBRCxBQUFVLE9BQVUsQUFDakQ7K0JBQ0UsQUFBQztlQUFELEFBQ08sQUFDTDtjQUZGLEFBRU0sQUFDSjttQkFIRixBQUdXLEFBQ1Q7bUJBQVMsT0FBQSxBQUFLLE1BSmhCLEFBSXNCLEFBQ3BCOzRCQUFrQixPQUFBLEFBQUssTUFMekIsQUFLK0I7O3NCQUwvQjt3QkFERixBQUNFLEFBUUg7QUFSRztBQUNFLFNBREY7QUFGSixBQUFPLEFBV1IsT0FYUTs7Ozs2QkFhQSxBQUNQOzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBREYsQUFDRSxBQUNBLCtCQUFBLEFBQUMsOEJBQUssdUJBQXFCLEtBQUEsQUFBSyxNQUExQixBQUFnQyxVQUF0QztvQkFBQTtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQyx5Q0FBTyxTQUFSLEFBQWdCLFNBQVEsT0FBTyxFQUFFLGNBQWpDLEFBQStCLEFBQWdCLE1BQU0sU0FBckQ7b0JBQUE7c0JBQUE7QUFBQTtTQUpOLEFBRUUsQUFDRSxBQUNFLEFBS0gsdUJBVEgsQUFTRyxBQUFLLEFBQ04sa0NBQUEsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBQVksZUFBQSxBQUFLLE1BQWpCLEFBQXVCLGNBWDNCLEFBQ0UsQUFVRSxBQUdMOzs7OzsyRyxBQWxFNEI7Ozs7O21CQUNuQjtBLDBCQUFZLE0sQUFBTSxNLEFBQWxCLFNBQXlCLEFBQzNCOztBLDJCQUFXLHdCQUFBLEEsQUFBWTs7dUJBQ0YsU0FBQSxBQUFTLFFBQVQsQUFBaUIsa0IsQUFBakIsQUFBbUM7O21CQUF4RDtBOzt1QkFDeUIsU0FBQSxBQUFTLFFBQVQsQUFBaUIsbUJBQWpCLEEsQUFBb0M7O21CQUE3RDtBOzt5Q0FFaUIsQUFBUSxVQUM3QixBQUFNLGNBQU4sQUFDRyxPQURILEFBRUcsSUFBSSxVQUFBLEFBQUMsU0FBRCxBQUFVLE9BQVUsQUFDdkI7eUJBQU8sU0FBQSxBQUFTLFFBQVQsQUFBaUIsU0FBakIsQUFBMEIsT0FBakMsQUFBTyxBQUFpQyxBQUN6QztBLEFBTGtCLEFBQ3JCLGlCQUFBLENBRHFCOzttQkFBakI7QTtpREFRQyxFQUFFLFNBQUYsU0FBVyxVQUFYLFVBQXFCLGNBQXJCLGNBQW1DLGtCQUFuQyxBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZmdCLEEsQUFzRTNCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9Sb3RoYWNrZXIvRGVza3RvcC9pa2lnYWlkb2pvL1NvbGlkaXR5L2tpY2tzdGFydCJ9