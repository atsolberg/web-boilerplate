import { css } from '@emotion/core/types';
import { gray } from '../../styles/variables-export.scss';
import { mobile, tablet } from '../../styles/breakpoints';
import { clearFix } from '../../styles/mixins';

const styles = css`
  ${clearFix()};
  padding-bottom: 15px;
  border-bottom: 1px solid ${gray};
  margin: 20px 0;

  .paging-header-count {
    line-height: 48px;
  }

  .selector {
    display: flex;
    align-items: center;
    margin-top: 10px;

    ${tablet} {
      margin: 0;
    }

    .selector-label {
      width: 90px;
      margin: 0;

      ${mobile} {
        width: 48px;
      }
    }

    .dropdown-toggle {
      border-color: transparent;
    }

    ${mobile} {
      .paging-header-sort {
        width: 50px;
      }

      .dropdown-menu {
        left: -110px;
      }
    }
  }
`;

export default styles;
