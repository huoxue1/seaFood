package dao;

import base.Base;
import com.jk1.dao.UserDao;
import com.jk1.entity.User;
import org.junit.Test;

import javax.annotation.Resource;

public class UserDaoTest extends Base {


    @Resource
    UserDao userDao;

    @Test
    public void TestSave(){
        userDao.save(new User("123","gjs",1));
    }
}
