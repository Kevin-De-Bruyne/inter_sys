<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      /* height: 95vh; */
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
  }
  .content{
    min-width: 500px;
  }
  </style>
  <template>
      <div class="layout">
          <Layout>
              <Header>
                  <Menu mode="horizontal" theme="dark" active-name="1">
                      <div class="layout-logo"></div>
                      <div class="layout-nav">
                          <MenuItem name="1">
                              <Icon type="ios-navigate"></Icon>
                              Item 1
                          </MenuItem>
                          <MenuItem name="2">
                              <Icon type="ios-keypad"></Icon>
                              Item 2
                          </MenuItem>
                          <MenuItem name="3">
                              <Icon type="ios-analytics"></Icon>
                              Item 3
                          </MenuItem>
                          <MenuItem name="4">
                              <Icon type="ios-paper"></Icon>
                              Item 4
                          </MenuItem>
                      </div>
                  </Menu>
              </Header>
              <Layout>
                  <Sider hide-trigger :style="{background: '#fff'}">
                      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                          <Submenu name="1">
                              <template slot="title">
                                  <Icon type="ios-navigate"></Icon>
                                  Item 1
                              </template>
                              <MenuItem name="1-1">Option 1</MenuItem>
                              <MenuItem name="1-2">Option 2</MenuItem>
                              <MenuItem name="1-3">Option 3</MenuItem>
                          </Submenu>
                          <Submenu name="2">
                              <template slot="title">
                                  <Icon type="ios-keypad"></Icon>
                                  Item 2
                              </template>
                              <MenuItem name="2-1">Option 1</MenuItem>
                              <MenuItem name="2-2">Option 2</MenuItem>
                          </Submenu>
                          <Submenu name="3">
                              <template slot="title">
                                  <Icon type="ios-analytics"></Icon>
                                  Item 3
                              </template>
                              <MenuItem name="3-1">Option 1</MenuItem>
                              <MenuItem name="3-2">Option 2</MenuItem>
                          </Submenu>
                      </Menu>
                  </Sider>
                  <Layout :style="{padding: '0 24px 24px'}">
                      <Breadcrumb :style="{margin: '24px 0'}">
                          <BreadcrumbItem>Home</BreadcrumbItem>
                          <BreadcrumbItem>Components</BreadcrumbItem>
                          <BreadcrumbItem>Layout</BreadcrumbItem>
                      </Breadcrumb>
                      <Content :style="{padding: '24px', minHeight: '480px', background: '#fff'}" class="content">
                         <Row>
                         <Col span="12">
                          <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-change="change"></DatePicker>
                        </Col>
                        <Col span="12">
                          <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" @on-change="change2"></DatePicker>
                       </Col>
                        </Row>
                        <!-- 表格 -->
                        <Table :columns="columns1" :data="data1" style="margin-top:35px;"></Table>
                      </Content>
                  </Layout>
              </Layout>
          </Layout>
      </div>
  </template>
  <script>
      export default {
        data(){
          return{
              columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
          }
        },
          methods:{
            change(e){
              console.log(e)
            },
            change2(e){
              console.log(e)
            }
          }
      }
  </script>
  