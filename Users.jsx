import React, { Component } from 'react';
import { BiPlus } from 'react-icons/bi';
import { RiDownload2Fill } from 'react-icons/ri';
import './Pages.css';
import PropTypes from 'prop-types';
import SearchBar from '../components/search-bar/SearchBar';
import StudentsTable from '../components/table-components/StudentsTable';
import closebtn from '../images/close.png';
import closebtn2 from '../images/close2.png';

class Users extends Component {
  constructor(props) {
    super(props);
    this.accessToken = props.accessToken;
    this.serverLocation = props.serverURL;
    this.state = {
      InviteUser: false,
      Subject: '',
      Body: '',
      inviteestxt: '',
      invitees: [],
    };
  }

  render() {
    const {
      InviteUser,
      Subject,
      Body,
      inviteestxt,
      invitees,
    } = this.state;
    return (
      <div>
        <div className="title-section">
          <h1 className="header">Uers</h1>
          <div className="top-cta">
            <button
              className="btn-right btn-black"
              type="button"
              onClick={
                () => {
                  console.log('Clicked Invite User!');
                  this.setState({ InviteUser: true });
                }

              }
            >
              <BiPlus size={20} />
              {' '}
              Invite User
            </button>
          </div>
        </div>
        <div className="searchArea">
          {' '}
          <SearchBar pageName="students" />
        </div>
        <StudentsTable headerOne="CHICKEN  NUGGIES" accessToken={this.accessToken} serverURL={this.serverLocation} limit={7} />
        <div className={`${InviteUser ? 'shadowbox' : 'shadowbox hide'}`}>
          <div className="contentbox">
            <div className="tit">Invite New Users</div>
            <div
              className="closebtn"
              role="button"
              styling="link"
              aria-hidden="true"
              onClick={
                () => {
                  this.setState({ InviteUser: false });
                }
              }
            >
              <img
                src={closebtn}
                alt="close"
              />
            </div>
            <p className="txt"> Edit the subject and body of your invite email according to your organization. Then, enter team members’ email addresses to invite  them to your portal.</p>
            <div className="inputline">
              <em className="tag">Subject</em>
              <input
                type="text"
                value={Subject}
                placeholder="Enter a subject line for the email here..."
                onChange={
                  (e) => {
                    this.setState({ Subject: e.target.value });
                  }
                }
              />
            </div>
            <div className="inputline textarea">
              <em className="tag">Body</em>
              <textarea
                value={Body}
                cols="30"
                rows="10"
                placeholder="Enter a body for the email here..."
                onChange={
                  (e) => {
                    this.setState({ Body: e.target.value });
                  }
                }
              />
            </div>
            <div className="inputline mainemail">
              <em className="tag">Invitees</em>
              <div className="inputmain email">
                {
                  invitees.map(
                    (ele, i) => {
                      const { key } = ele;
                      return (
                        <span
                          key={key}
                        >
                          {ele}
                          <a
                            role="button"
                            styling="link"
                            aria-hidden="true"
                            onClick={
                              (e) => {
                                console.log(i);
                                const datas = invitees;
                                datas.splice(i, 1);
                                this.setState({ invitees: [...datas] });
                              }
                            }
                          >
                            <img
                              alt="invitees"
                              src={closebtn2}
                            />
                          </a>

                        </span>
                      );
                    },
                  )
                }
                <input
                  type="text"
                  placeholder="Enter emails separated by commas or spaces..."
                  onChange={(e) => {
                    this.setState({ inviteestxt: e.target.value });
                  }}
                  value={inviteestxt}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13 || e.keyCode === 188) {
                      let txt = '';
                      if (e.keyCode === 188) {
                        txt = e.target.value.substr(0, e.target.value.length - 1);
                      } else {
                        txt = e.target.value;
                      }
                      this.setState({ invitees: [...invitees, txt] });
                      this.setState({ inviteestxt: '' });
                    }
                  }}
                />

              </div>

            </div>
            {

              (Subject === '' || Body === '' || inviteestxt === '' || invitees === '')
                ? (
                  <div className="btnline">
                    <a
                      id="send"
                      role="button"
                      styling="link"
                      aria-hidden="true"
                    >
                      Send Invite
                    </a>
                  </div>
                )
                : (
                  <div className="btnline">
                    <a
                      id="sent"
                      role="button"
                      styling="link"
                      aria-hidden="true"
                    >
                      Sent!
                    </a>
                  </div>
                )

            }
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  accessToken: PropTypes.string.isRequired,
  serverURL: PropTypes.string.isRequired,
};

export default Users;
