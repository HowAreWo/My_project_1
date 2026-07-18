package com.couplegame.service;
import com.couplegame.model.Punishment;
import com.couplegame.repository.PunishmentRepository;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class PunishmentService {
    private final PunishmentRepository punishmentRepository;
    public PunishmentService(PunishmentRepository r) { this.punishmentRepository = r; }
    
    public Punishment getRandom(Integer level, String category) {
        List<Punishment> all = punishmentRepository.findAll();
        List<Punishment> filtered = new ArrayList<>();
        for (Punishment p : all) {
            if (level != null && !level.equals(p.getLevel())) continue;
            if (category != null && !category.isEmpty() && !category.equals(p.getCategory())) continue;
            filtered.add(p);
        }
        if (filtered.isEmpty()) throw new RuntimeException("No punishments found for selected filters");
        Collections.shuffle(filtered);
        return filtered.get(0);
    }
    public Punishment getRandom() { return getRandom(null, null); }
    public List<String> getCategories(Integer level) { return punishmentRepository.findCategoriesByLevel(level); }
    
    public void initDefaultPunishments() {
        if (!punishmentRepository.findAll().isEmpty()) return;
        String[][] data = {
            {"做20个俯卧撑","1","体能"},{"平板支撑1分钟","1","体能"},{"深蹲30个","1","体能"},
            {"高抬腿跑30秒","1","体能"},{"仰卧起坐25个","1","体能"},{"靠墙静蹲1分钟","1","体能"},
            {"做10个波比跳","2","体能"},{"单手俯卧撑5个","2","体能"},{"弓步蹲每边15个","2","体能"},
            {"连续跳绳100下","2","体能"},{"倒立靠墙30秒","3","体能"},{"负重深蹲20个","3","体能"},
            {"模仿动物叫10秒","1","表演"},{"用方言念一段绕口令","1","表演"},{"学一个明星说话30秒","1","表演"},
            {"假装自己是天气预报员播报天气","2","表演"},{"用说唱方式介绍自己","2","表演"},{"表演一段相声","2","表演"},
            {"走一段时装秀","2","表演"},{"表演一个小品","3","表演"},{"全程用外国口音说话3轮","3","表演"},
            {"对陌生人微笑打招呼","1","社交"},{"发一条正能量的朋友圈","1","社交"},{"给最近联系人发祝福语","1","社交"},
            {"和旁边的人握手并称赞对方","1","社交"},{"打电话给朋友说我爱你","2","社交"},{"发一张丑照到朋友圈保留1小时","2","社交"},
            {"向陌生人借1块钱","3","社交"},{"在公共场合大声唱一句","3","社交"},
            {"用纸折一个动物送给对方","1","创意"},{"用橡皮泥捏一个对方的样子","1","创意"},{"画一幅抽象画并解释含义","2","创意"},
            {"用3个物品编一个故事","2","创意"},{"即兴编一首诗念出来","2","创意"},{"设计一个签名动作","2","创意"},
            {"拍一段创意短视频","3","创意"},
            {"讲一个笑话把大家逗笑","1","搞笑"},{"学一个表情包做出来","1","搞笑"},{"做十个鬼脸","1","搞笑"},
            {"用最搞笑的方式走路","2","搞笑"},{"模仿综艺节目里的片段","2","搞笑"},{"倒立唱歌","3","搞笑"},
            {"吃东西不许用手","1","整蛊"},{"单脚站立完成本局","1","整蛊"},{"戴眼罩30秒做事","2","整蛊"},
            {"和左边的人换一只鞋穿","2","整蛊"},{"背朝外倒着走一分钟","2","整蛊"},{"闭眼摸东西猜是什么","2","整蛊"},
            {"让对方在你脸上画画","3","整蛊"},{"一整天不许说'我'字","3","整蛊"},{"喝水时不许咽下去坚持30秒","3","整蛊"}
        };
        List<Punishment> list = new ArrayList<>();
        for (String[] d : data) {
            Punishment p = new Punishment();
            p.setContent(d[0]); p.setLevel(Integer.parseInt(d[1])); p.setCategory(d[2]);
            list.add(p);
        }
        punishmentRepository.saveAll(list);
    }
}
